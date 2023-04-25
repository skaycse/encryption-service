import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, scrypt } from 'crypto';
import { DecryptModel, DecryptResponseModel, EncryptModel, EncryptResponseModel } from 'src/model/encrypt.model';
import { promisify } from 'util';

@Injectable()
export class EncryptService {

    async encryptText(encryptModel: EncryptModel): Promise<EncryptResponseModel> {
        const iv = process.env.IV;        

        const password = encryptModel.secretKey;
        const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
        const cipher = createCipheriv('aes-256-ctr', key, iv);
        const textToEncrypt = encryptModel.text;
        const encryptedText = Buffer.concat([
            cipher.update(textToEncrypt),
            cipher.final(),
        ]);
        var model = new EncryptResponseModel();
        model.encryptedText = encryptedText.toString('base64');
        return model;
    }

    async decryptText(decryptModel: DecryptModel): Promise<DecryptResponseModel> {
        const iv = process.env.IV;
        const password = decryptModel.secretKey;
        const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
        const decipher = createDecipheriv('aes-256-ctr', key, iv);
        const textToEncrypt = Buffer.from(decryptModel.encryptedText, 'base64');
        const decryptedText = Buffer.concat([
            decipher.update(textToEncrypt),
            decipher.final(),
        ]);
        var model = new DecryptResponseModel();
        model.decryptedText = decryptedText.toString();
        return model;
    }

}
