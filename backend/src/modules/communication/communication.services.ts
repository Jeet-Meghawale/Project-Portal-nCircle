import { createCommunicationInput, workspaceCommunicationInput } from "./communication.types";
import { ThreadCommunicationRepository, WorkspaceCommunicationRepository } from "./communication.repository";
import { get } from "node:http";

export const ThreadCommunicationService = {
    createCommunication(dto: createCommunicationInput , userId: string) {
        // need to read it once to check if logic is correct, then we can optimize it by directly creating the data object without reading it first
        const data: any = {};
        if (dto.threadId) {
            data.thread = {
                connect: { id: dto.threadId }
            }
        }
        if (dto.message) {
            data.message = dto.message;
        }
        data.createdBy = {
            connect: { id: userId }
        }

        return ThreadCommunicationRepository.createCommunication(data);
    },
    getCommunicationsByThreadId(threadId: string) {
        return ThreadCommunicationRepository.getCommunicationsByThreadId(threadId);
    },
    deleteCommunication(communicationId: string) {
        return ThreadCommunicationRepository.deleteCommunication(communicationId);
    },
    updateCommunication(communicationId: string, message: string) {
        return ThreadCommunicationRepository.updateCommunication(communicationId, { message });
    },
    getCommunicationById(communicationId: string) {
        return ThreadCommunicationRepository.getCommunicationById(communicationId);
    }

};
export const WorkspaceCommunicationService = {
    // similar to thread communication but with workspaceId instead of threadId
    createCommunication(dto: workspaceCommunicationInput, userId: string) {
        const data: any = {};
        if (dto.workspaceId) {
            data.workspace = {
                connect: { id: dto.workspaceId }
            }
        }
        if (dto.message) {
            data.message = dto.message;
        }

        data.createdBy = {
            connect: { id: userId }
        }
        
        return WorkspaceCommunicationRepository.createCommunication(data);
    },

    getCommunicationsByWorkspaceId(workspaceId: string){
        return WorkspaceCommunicationRepository.getCommunicationsByWorkspaceId(workspaceId);
    },
        deleteCommunication(communicationId: string){
    return WorkspaceCommunicationRepository.deleteCommunication(communicationId);
},
updateCommunication(communicationId: string, message: string){
    return WorkspaceCommunicationRepository.updateCommunication(communicationId, { message });
},
getCommunicationById(communicationId: string){
    return WorkspaceCommunicationRepository.getCommunicationById(communicationId);
}
};