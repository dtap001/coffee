import { SetMetadata } from '@nestjs/common';

export const PUBLIC_METADATAKEY = 'PUBLIC';
export const Public = () => SetMetadata(PUBLIC_METADATAKEY, PUBLIC_METADATAKEY);
