// DARK AI - Products Management

const ProductsManager = {
    client: null,

    init(supabaseClient) {
        this.client = supabaseClient;
    },

    // رفع صورة المنتج
    async uploadImage(file) {
        if (!file) return "";

        if (!file.type.startsWith("image/")) {
            throw new Error("يرجى اختيار ملف صورة.");
        }

        if (file.size > 5 * 1024 * 1024) {
            throw new Error("حجم الصورة يجب ألا يتجاوز 5 ميجابايت.");
        }

        const extension = file.name.split(".").pop().toLowerCase();

        const fileName =
            Date.now() + "-" +
            Math.random().toString(36).slice(2) +
            "." + extension;

        const filePath = "products/" + fileName;

        const { data, error } = await this.client
            .storage
            .from("product-images")
            .upload(filePath, file, {
                cacheControl: "3600",
                upsert: false
            });

        if (error) throw error;

        const { data: publicData } = this.client
            .storage
            .from("product-images")
            .getPublicUrl(data.path);

        return publicData.publicUrl;
    },

    // عرض المنتجات
    async getAll() {
        const { data, error } = await this.client
            .from("products")
            .select("*")
            .order("id", { ascending: false });

        if (error) throw error;

        return data || [];
    },

    // إضافة منتج
    async add(product) {
        const { data, error } = await this.client
            .from("products")
            .insert([{
                name: product.name,
                description: product.description || "",
                price: Number(product.price),
                category: product.category || "",
                image_url: product.image_url || "",
                stock: Number(product.stock || 0)
            }])
            .select();

        if (error) throw error;

        return data[0];
    },

    // تعديل منتج
    async update(id, product) {
        const { data, error } = await this.client
            .from("products")
            .update({
                name: product.name,
                description: product.description || "",
                price: Number(product.price),
                category: product.category || "",
                image_url: product.image_url || "",
                stock: Number(product.stock || 0)
            })
            .eq("id", id)
            .select();

        if (error) throw error;

        return data[0];
    },

    // حذف منتج
    async delete(id) {
        const { error } = await this.client
            .from("products")
            .delete()
            .eq("id", id);

        if (error) throw error;

        return true;
    }
};
