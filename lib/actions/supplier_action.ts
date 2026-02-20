
"use server";
export const handleSupplierAction = async (formData: any) => {
    try {
        // Process the supplier action with the provided form data
        // For example, you can call an API to create or update a supplier
        const result = await processSupplierAction(formData);
        // Return the result to the component
        if (result.success) {
            return {
                success: true,
                message: "Supplier adding successful",
                data: result.data
            };
        }
        return {
            success: false,

            message: result.message || "Supplier add failed"
        };
    } catch (err: Error | any) {
        return {
            success: false, 
            message: err.message || "Supplier add failed"
        };
    }
};
