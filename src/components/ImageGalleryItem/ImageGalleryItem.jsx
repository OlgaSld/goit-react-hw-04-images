import { GalleryItem, ImageGalleryItemImage } from './ImageGalleryItem_styled.jsx'

export const ImageGalleryItem = ({image, onClick}) => {
    return (
      <GalleryItem>
        <ImageGalleryItemImage
          src={image.webformatURL}
          alt={image.tag}
          onClick={() => onClick(image.largeImageURL, image.tag)}
        />
      </GalleryItem>
    );
}