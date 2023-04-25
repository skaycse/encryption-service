import { Controller, Post, Body } from '@nestjs/common';
import { DecryptModel, EncryptModel, EncryptResponseModel } from 'src/model/encrypt.model';
import { EncryptService } from './encrypt.service';

@Controller('security')
export class EncryptController {

    constructor(private encryptService: EncryptService) { }

    @Post('encrypt')
    async encrypt(@Body() encryptModel: EncryptModel): Promise<EncryptResponseModel> {
        return await this.encryptService.encryptText(encryptModel);
    }

    @Post('decrypt')
    async decrypt(@Body() decryptModel: DecryptModel) {
        return await this.encryptService.decryptText(decryptModel);
    }
}
