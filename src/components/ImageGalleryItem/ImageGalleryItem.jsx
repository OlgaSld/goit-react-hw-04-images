import { GalleryItem, ImageGalleryItemImage } from './ImageGalleryItem_styled.jsx'

export const ImageGalleryItem = ({image, onClick}) => {
    return (
      <GalleryItem>
        <ImageGalleryItemImage
          src={image.webformatURL}
          alt={image.tags}
          onClick={() =>
            onClick({ largeImageURL: image.largeImageURL, tags: image.tags })
          }
        />
      </GalleryItem>
    );
}
