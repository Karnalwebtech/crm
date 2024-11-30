"use client"; // Ensures this is a client component

import { useGetSingleMutation } from '@/state/orderApi';
import { order_type_form, Post_Response } from '@/types/order_type';
import React, { useEffect, memo, useMemo, useCallback } from 'react';
import { Order_form } from '../order-form/Order_form';
import { CircularProgress } from '@nextui-org/react';
import toast from 'react-hot-toast';

interface UpdateOrderProps {
    id: string;
}

const UpdateOrder: React.FC<UpdateOrderProps> = memo(({ id }) => {
    const [getSingle, { data, isLoading, error }] = useGetSingleMutation();

    // Fetch data when `id` changes
    const fetchOrder = useCallback(() => {
        if (id) {
            getSingle(id);
        }
    }, [id, getSingle]);

    useEffect(() => {
        fetchOrder(); // Invoke the callback to fetch the order
    }, [fetchOrder]);

    // Extract the response and order data with memoization to prevent recalculations
    const order = useMemo(() => {
        const response: Post_Response | undefined = data as Post_Response | undefined;
        return response?.order;
    }, [data]);

    useEffect(() => {
        // Handle error messages
        if (error) {
            let errorMessage = "An unexpected error occurred."; // Default message
            // Check if 'error' contains the expected 'data' structure with a message
            const apiError = error as { data?: { message?: string } };
            if (apiError?.data?.message) {
                errorMessage = apiError.data.message;
            }
            toast.error(errorMessage);
        }
    }, [error]);



    return (
        <div>
            {isLoading ? (
                <div className="absolute z-10 inset-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <CircularProgress />
                </div>
            ) : (
                <Order_form data={order} edit={true} />
            )}
        </div>
    );
});

export default UpdateOrder;
