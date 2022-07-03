export enum EAuthStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export enum EProposalStatus {
  'ACCEPTED' = 0,
  'PENDING' = 1,
  'REJECTED' = 2,
}

export enum EEntityPartition {
  MAIN = 'mainPartition',
  MAIN_HELPER = 'mainHelperPartition',
  EXPIERIENCE = 'expieriencePartition',
  EXPIERIENCE_HELPER = 'expierienceHelperPartition',
  CONTACTS = 'contactsPartition',
  MEMBERS = 'membersPartition'
}
