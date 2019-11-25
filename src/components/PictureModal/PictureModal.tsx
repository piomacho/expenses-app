import * as React from 'react';
import { Picture } from './PictureModal.style';

interface IPictureModal {
  url: string;
}

const PictureModal = ({ url }: IPictureModal) => <Picture src={url} />;

export default PictureModal;
