// DARK AI - Products Management

const ProductsManager = {
    client: null,

    init(supabaseClient) {
        this.client = supabaseClient;
    },

    async getAll() {
        const { data, error } = await this.client
            .from("products")
            .select("*")
            .order("id", { ascending: false });

        if (error) {
            console.error("Products error:", error);
            return [];
        }

        return data || [];
    },

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

    async delete(id) {
        const { error } = await this.client
            .from("products")
            .delete()
            .eq("id", id);

        if (error) throw error;
        return true;
    }
};
