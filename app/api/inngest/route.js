import { serve } from "inngest/next";
import { inngest, syncUserCreation, syncUserDeletion } from "@/config/inngest";
import { helloWorld } from "../../../inngest/functions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    syncUserCreation,
    syncUserUpdation,
    syncUserDeletion,
  ],
});