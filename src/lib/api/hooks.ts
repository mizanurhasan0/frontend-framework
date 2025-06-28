import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "./client";

// Generic GET hook
export function useGet<T>(
    key: string[],
    endpoint: string,
    options?: {
        enabled?: boolean;
        refetchInterval?: number;
    }
) {
    return useQuery({
        queryKey: key,
        queryFn: () => apiRequest<T>(endpoint),
        enabled: options?.enabled ?? true,
        refetchInterval: options?.refetchInterval,
    });
}

// Generic POST hook
export function usePost<T, R>(
    key: string[],
    endpoint: string,
    options?: {
        onSuccess?: (data: R) => void;
        onError?: (error: Error) => void;
    }
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: T) =>
            apiRequest<R>(endpoint, {
                method: "POST",
                body: JSON.stringify(data),
            }),
        onSuccess: (data: R) => {
            // Invalidate and refetch related queries
            queryClient.invalidateQueries({ queryKey: key });
            options?.onSuccess?.(data);
        },
        onError: options?.onError,
    });
}

// Generic PUT hook
export function usePut<T, R>(
    key: string[],
    endpoint: string,
    options?: {
        onSuccess?: (data: R) => void;
        onError?: (error: Error) => void;
    }
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: T) =>
            apiRequest<R>(endpoint, {
                method: "PUT",
                body: JSON.stringify(data),
            }),
        onSuccess: (data: R) => {
            queryClient.invalidateQueries({ queryKey: key });
            options?.onSuccess?.(data);
        },
        onError: options?.onError,
    });
}

// Generic DELETE hook
export function useDelete<R>(
    key: string[],
    endpoint: string,
    options?: {
        onSuccess?: (data: R) => void;
        onError?: (error: Error) => void;
    }
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () =>
            apiRequest<R>(endpoint, {
                method: "DELETE",
            }),
        onSuccess: (data: R) => {
            queryClient.invalidateQueries({ queryKey: key });
            options?.onSuccess?.(data);
        },
        onError: options?.onError,
    });
}

// Specific API hooks for common operations
export function useGetProducts() {
    return useGet(["products"], "/products");
}

export function useGetCategories() {
    return useGet(["categories"], "/categories");
}

export function useGetOrders() {
    return useGet(["orders"], "/orders");
}

export function useGetUsers() {
    return useGet(["users"], "/users");
}

export function useCreateProduct() {
    return usePost(["products"], "/products", {
        onSuccess: () => {
            console.log("Product created successfully");
        },
    });
}

export function useUpdateProduct() {
    return usePut(["products"], "/products", {
        onSuccess: () => {
            console.log("Product updated successfully");
        },
    });
}

export function useDeleteProduct() {
    return useDelete(["products"], "/products", {
        onSuccess: () => {
            console.log("Product deleted successfully");
        },
    });
} 