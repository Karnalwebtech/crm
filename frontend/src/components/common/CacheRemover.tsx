import { useHandleNotifications } from "@/hooks/useHandleNotifications";
import { useRemoveCacheMutation } from "@/state/api";
import { Eraser } from "lucide-react";
import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
interface CacheRemoverProps {
    pattern: string[];
    buttonLabel?: string;
    buttonStyle?: string; // Optional custom styles
}
const CacheRemover: React.FC<CacheRemoverProps> = ({
    pattern,
    buttonLabel = "Clear Cache",
    buttonStyle = "bg-gray-100 text-nlck hover:bg-gray-200",
}) => {
    const [update, { data, error, isSuccess, isLoading }] = useRemoveCacheMutation()
    // Function to handle cache removal
    const handleRemoveCache = useCallback(async () => {
        try {
            for (const item of pattern) {
                const updatedData = { pattern: item };
                await update(updatedData).unwrap(); // Ensure the mutation completes before continuing
            }
        } catch (err) {
            console.error("Error removing cache:", err);
        }
    }, [pattern, update]);

    // Handle notifications
    useHandleNotifications({
        error,
        isSuccess,
        successMessage: data?.message,
    });

    return (
        <Button
            onClick={() => handleRemoveCache()}
            disabled={isLoading}
            className={buttonStyle}
        >
            <Eraser color="red" />
            {isLoading ? "Clearing..." : buttonLabel}
        </Button>
    );
};
export default React.memo(CacheRemover);
