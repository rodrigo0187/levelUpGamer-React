import { JwrPayload } from "../types/auth";
declare global {
    namespace Express {
        interface Request {
            user?: JwrPayload;
        }
    }
}