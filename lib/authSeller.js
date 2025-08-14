import { clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const authSeller = async (userId) => {
    try {

        const client = await clerkClient()
        const user = await client.users.getUser(userId)

        if (user.publicMetadata.role === 'seller') {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: "Not authorized" });
    }
}

export default authSeller;

// import { clerkClient } from '@clerk/nextjs/server';
// import { NextResponse } from 'next/server';

// const authSeller = async (userId) => {
//     try {
//         const user = await clerkClient.users.getUser(userId);
//         return user.publicMetadata.role === 'seller';
//     } catch (error) {
//         return NextResponse.json({ success: false, message: error.message });
//     }
// }

// export default authSeller;
