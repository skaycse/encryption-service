export class EncryptResponseModel {
    encryptedText: string;
}
export class EncryptModel {
    text: string;
    secretKey: string;
}
export class DecryptModel {
    encryptedText: string;
    secretKey: string;
}
export class DecryptResponseModel {
    decryptedText: string;
}
