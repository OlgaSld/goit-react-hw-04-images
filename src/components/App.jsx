import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { SearchBar } from './Searchbar/Searchbar';
import { Layout } from './App_styled';
import { fetchImages } from 'api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMore } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';

export const App = () => {
    const [query, setQuery] = useState('');
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoader, setIsLoader] = useState(false);
    const [error, setError] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showBtn, setShowBtn] = useState(false);
    const [largeImg, setLargeImg] = useState({})

    useEffect(() => {
         if (!query) {
           return;
         }
        async function getImages() {
            try {
            setIsLoader(true);
            setError(false);
                const data = await fetchImages(query, page);
                if (data.hits.length === 0) {
                toast.error(
            'Sorry, there are no images matching your search query. Please try again'
            )
            return;
            }
                setImages(prevImages => [...prevImages, ...data.hits]);
                setShowBtn(page < Math.ceil(data.totalHits / 12));
            if (page === Math.ceil(data.totalHits / 12)) {
            toast.success('We are sorry, but you have reached the end of search results.')
        }
            } catch (error) {
                setError(true);
                toast.error('Oops... Something went wrong. Please try again')
            } finally {
                setIsLoader(false)
                }
            }
        getImages()
    }, [query, page])    

    const submitRequest = query => {
        setQuery(query);
        setImages([]);
        setPage(1)
      };

    const resetSearch = () => {
        setQuery('');
        setImages([]);
        setPage(1);
        setIsLoader(false);
        setError(false);
        setShowModal(false);
      };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1)
  };
    
  const openModal = (image) => {
    toggleModal();
    setLargeImg(image)
  };

  const toggleModal = () => {
    setShowModal(!showModal)
  };

    return (
        <Layout>
            <SearchBar
                onSubmit={submitRequest}
                onReset={resetSearch}
            />
            {error &&
                !isLoader &&
                toast.error('Sorry! Something went wrong. Please try again!')}
            {isLoader && <Loader />}
            {!error && (<ImageGallery images={images} onOpenModal={openModal} />)}
            {showBtn && (
                <LoadMore onClick={onLoadMore} />
            )}
            {showModal && (
                <Modal
                    onModalClick={toggleModal}
                    largeImage={largeImg.largeImageURL}
                    alt={largeImg.tags}
                />
            )}
            <Toaster position="top-right" />
        </Layout>
    );
}