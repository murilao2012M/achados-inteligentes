"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseAdminClient, createSupabaseServerClient } from "@/utils/supabase/server";
import { requireAdminUser } from "@/utils/admin";
import { slugify } from "@/utils/format";

type LoginState = {
  error: string;
};

function parseLines(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseCommaList(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseSections(value: FormDataEntryValue | null) {
  const raw = String(value ?? "").trim();
  if (!raw) return [];

  return raw.split(/\n\s*\n/).map((block) => {
    const lines = block
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
    const [headingLine, ...content] = lines;

    return {
      heading: headingLine?.replace(/^#\s*/, "") ?? "Seção",
      content
    };
  });
}

function parseFaq(value: FormDataEntryValue | null) {
  return parseLines(value).map((line) => {
    const [question, answer] = line.split("::");
    return {
      question: question?.trim() ?? "",
      answer: answer?.trim() ?? ""
    };
  });
}

async function uploadImageIfProvided(
  file: File | null,
  folder: string,
  fallbackUrl: string
) {
  if (!file || file.size === 0) {
    return fallbackUrl;
  }

  const client = createSupabaseAdminClient();
  if (!client) {
    return fallbackUrl;
  }

  const extension = file.name.split(".").pop() || "jpg";
  const filePath = `${folder}/${crypto.randomUUID()}.${extension}`;
  const bytes = await file.arrayBuffer();

  const { error } = await client.storage
    .from("site-assets")
    .upload(filePath, bytes, {
      contentType: file.type || "image/jpeg",
      upsert: true
    });

  if (error) {
    return fallbackUrl;
  }

  const {
    data: { publicUrl }
  } = client.storage.from("site-assets").getPublicUrl(filePath);

  return publicUrl;
}

async function requireServices() {
  const client = createSupabaseAdminClient();
  if (!client) {
    throw new Error(
      "Supabase não configurado. Defina NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY e SUPABASE_SERVICE_ROLE_KEY."
    );
  }

  await requireAdminUser();
  return client;
}

export async function signInAction(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const client = await createSupabaseServerClient();

  if (!client) {
    return {
      error:
        "Supabase ainda não foi configurado no projeto. Configure as variáveis de ambiente antes de usar o painel."
    };
  }

  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const { error } = await client.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: "Não foi possível entrar. Revise e-mail e senha." };
  }

  redirect("/admin");
}

export async function signOutAction() {
  const client = await createSupabaseServerClient();
  await client?.auth.signOut();
  redirect("/admin/login");
}

export async function saveCategoryAction(formData: FormData) {
  const client = await requireServices();
  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "");
  const slugInput = String(formData.get("slug") ?? "");
  const imageUrl = await uploadImageIfProvided(
    formData.get("imageFile") as File | null,
    "categories",
    String(formData.get("image") ?? "")
  );

  const payload = {
    name,
    slug: slugify(slugInput || name),
    description: String(formData.get("description") ?? ""),
    image_url: imageUrl
  };

  if (id) {
    await client.from("categories").update(payload).eq("id", id);
  } else {
    await client.from("categories").insert(payload);
  }

  revalidateTag("categories");
  revalidateTag("products");
  revalidatePath("/admin/categorias");
  revalidatePath("/");
  revalidatePath("/categorias");
  revalidatePath("/categorias/[slug]", "page");
  redirect("/admin/categorias");
}

export async function deleteCategoryAction(formData: FormData) {
  const client = await requireServices();
  const id = String(formData.get("id") ?? "");
  await client.from("categories").delete().eq("id", id);
  revalidateTag("categories");
  revalidateTag("products");
  revalidatePath("/admin/categorias");
  revalidatePath("/");
  revalidatePath("/categorias");
  revalidatePath("/categorias/[slug]", "page");
}

export async function saveProductAction(formData: FormData) {
  const client = await requireServices();
  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "");
  const slugInput = String(formData.get("slug") ?? "");
  const categorySlug = String(formData.get("categorySlug") ?? "");
  const { data: category } = await client
    .from("categories")
    .select("id")
    .eq("slug", categorySlug)
    .single();

  const imageUrl = await uploadImageIfProvided(
    formData.get("imageFile") as File | null,
    "products",
    String(formData.get("image") ?? "")
  );

  const payload = {
    name,
    slug: slugify(slugInput || name),
    category_id: category?.id ?? null,
    description: String(formData.get("description") ?? ""),
    image_url: imageUrl,
    price_label: String(formData.get("priceLabel") ?? ""),
    current_price: String(formData.get("currentPrice") ?? ""),
    original_price: String(formData.get("originalPrice") ?? ""),
    installment_info: String(formData.get("installmentInfo") ?? ""),
    price_badge: String(formData.get("priceBadge") ?? ""),
    price_note: String(formData.get("priceNote") ?? ""),
    benefits: parseLines(formData.get("benefits")),
    pros: parseLines(formData.get("pros")),
    cons: parseLines(formData.get("cons")),
    recommended_for: String(formData.get("recommendedFor") ?? ""),
    affiliate_link: String(formData.get("affiliateLink") ?? ""),
    highlight_tag: String(formData.get("highlightTag") ?? ""),
    editorial_rating: Number(formData.get("editorialRating") ?? 0),
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on"
  };

  if (id) {
    await client.from("products").update(payload).eq("id", id);
  } else {
    await client.from("products").insert(payload);
  }

  revalidateTag("products");
  revalidateTag("categories");
  revalidatePath("/admin/produtos");
  revalidatePath("/");
  revalidatePath("/produtos");
  revalidatePath("/produtos/[slug]", "page");
  revalidatePath("/categorias/[slug]", "page");
  redirect("/admin/produtos");
}

export async function deleteProductAction(formData: FormData) {
  const client = await requireServices();
  const id = String(formData.get("id") ?? "");
  await client.from("products").delete().eq("id", id);
  revalidateTag("products");
  revalidateTag("categories");
  revalidatePath("/admin/produtos");
  revalidatePath("/");
  revalidatePath("/produtos/[slug]", "page");
  revalidatePath("/categorias/[slug]", "page");
}

export async function savePostAction(formData: FormData) {
  const client = await requireServices();
  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "");
  const slugInput = String(formData.get("slug") ?? "");
  const imageUrl = await uploadImageIfProvided(
    formData.get("imageFile") as File | null,
    "posts",
    String(formData.get("image") ?? "")
  );

  const payload = {
    title,
    slug: slugify(slugInput || title),
    category: String(formData.get("category") ?? ""),
    excerpt: String(formData.get("excerpt") ?? ""),
    image_url: imageUrl,
    seo_title: String(formData.get("seoTitle") ?? ""),
    seo_description: String(formData.get("seoDescription") ?? ""),
    published_at: String(formData.get("publishedAt") ?? ""),
    sections: parseSections(formData.get("sections")),
    faq: parseFaq(formData.get("faq")),
    recommended_product_slugs: parseCommaList(
      formData.get("recommendedProductSlugs")
    ),
    published: formData.get("published") === "on"
  };

  if (id) {
    await client.from("posts").update(payload).eq("id", id);
  } else {
    await client.from("posts").insert(payload);
  }

  revalidateTag("posts");
  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  revalidatePath("/blog/[slug]", "page");
  revalidatePath("/");
  redirect("/admin/posts");
}

export async function deletePostAction(formData: FormData) {
  const client = await requireServices();
  const id = String(formData.get("id") ?? "");
  await client.from("posts").delete().eq("id", id);
  revalidateTag("posts");
  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  revalidatePath("/blog/[slug]", "page");
  revalidatePath("/");
}

export async function saveComparisonAction(formData: FormData) {
  const client = await requireServices();
  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "");
  const slugInput = String(formData.get("slug") ?? "");
  const payload = {
    title,
    slug: slugify(slugInput || title),
    description: String(formData.get("description") ?? ""),
    product_slugs: parseLines(formData.get("products")),
    published: formData.get("published") === "on"
  };

  if (id) {
    await client.from("comparisons").update(payload).eq("id", id);
  } else {
    await client.from("comparisons").insert(payload);
  }

  revalidateTag("comparisons");
  revalidatePath("/admin/comparativos");
  revalidatePath("/comparativos");
  revalidatePath("/comparativos/[slug]", "page");
  revalidatePath("/");
  redirect("/admin/comparativos");
}

export async function deleteComparisonAction(formData: FormData) {
  const client = await requireServices();
  const id = String(formData.get("id") ?? "");
  await client.from("comparisons").delete().eq("id", id);
  revalidateTag("comparisons");
  revalidatePath("/admin/comparativos");
  revalidatePath("/comparativos");
  revalidatePath("/comparativos/[slug]", "page");
  revalidatePath("/");
}

export async function saveSiteSettingsAction(formData: FormData) {
  const client = await requireServices();

  const payload = {
    id: "main",
    contact_email: String(formData.get("contactEmail") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    address: String(formData.get("address") ?? ""),
    instagram_url: String(formData.get("instagramUrl") ?? ""),
    youtube_url: String(formData.get("youtubeUrl") ?? ""),
    newsletter_enabled: formData.get("newsletterEnabled") === "on",
    newsletter_title: String(formData.get("newsletterTitle") ?? ""),
    newsletter_description: String(formData.get("newsletterDescription") ?? "")
  };

  await client.from("site_settings").upsert(payload, { onConflict: "id" });

  revalidateTag("site-settings");
  revalidatePath("/admin/configuracoes");
  revalidatePath("/");
  revalidatePath("/contato");
  redirect("/admin/configuracoes");
}
