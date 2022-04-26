    
export type IPartner = {
    id: number,
    id_pdv: string,
    name: string
}

export type  IPartnerDetails = {
 sharedAsset: {id: number, name: string}[]
} & IPartner
