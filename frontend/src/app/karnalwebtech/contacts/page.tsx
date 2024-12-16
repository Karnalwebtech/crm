import Contacts from "@/modules/karnalwebtech/contacts/contacts"
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Contacts",
};
const page = () => {
    return (
        <Contacts />
    )
}
export default page