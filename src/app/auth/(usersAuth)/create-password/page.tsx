import CreatePassword from "@/features/auth/usersAuth/create-password/Index";
import {Suspense} from "react";

const page = () => {
    return (
        <Suspense>
            <CreatePassword/>
        </Suspense>
    );
};

export default page;
