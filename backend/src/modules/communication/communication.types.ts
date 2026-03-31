import { z } from "zod";
import { createCommunicationInputSchema, workspaceCommunicationInputSchema } from "../../validators/communication.validator";

export type createCommunicationInput = z.infer<typeof createCommunicationInputSchema>; 

export type workspaceCommunicationInput = z.infer<typeof workspaceCommunicationInputSchema>;    

