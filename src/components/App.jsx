import { useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import AppWrapper from './App.styled';
import Loader from './Loader/Loader';
import Message from './Message/Message';

export const App = () => {
  const [query, setQuery] = useState(null);
  const [modal, setModal] = useState(null);
  const [loadingCount, setLoadingCount] = useState(0);
  const [error, setError] = useState(false);

  const updateError = flag => {
    setError(flag);
  };

  const updateLoader = delta => {
    console.log(loadingCount, delta);
    setLoadingCount(prevLoadingCount =>
      delta === 0 ? 0 : prevLoadingCount + delta
    );
  };

  const handleSubmit = values => {
    if (query !== values.query) {
      setQuery(values.query);
    }
  };

  const handleImageClick = values => {
    setModal({ largeImageURL: values.largeImageURL, tags: values.tag });
  };
  const handleCloseModal = () => {
    setModal(null);
  };

  return (
    <AppWrapper>
      <Searchbar onSubmit={handleSubmit} />

      {query && !error && (
        <ImageGallery
          query={query}
          imageClick={handleImageClick}
          updateLoader={updateLoader}
          updateError={updateError}
        />
      )}
      {modal && (
        <Modal
          closeModal={handleCloseModal}
          updateLoader={updateLoader}
          largeImageURL={modal.largeImageURL}
          tags={modal.tags}
        />
      )}
      {loadingCount > 0 && <Loader />}
      {query === '' && <Message>Please, input key words for search. </Message>}
      {error && (
        <Message>Internet connection error. Please, try later! </Message>
      )}
    </AppWrapper>
  );
};
// export class App extends Component {
//   state = {
//     query: null,
//     modal: null,
//     loadingCount: 0,
//     error: false,
//   };

//   handleSubmit = values => {
//     if (this.state.query !== values.query) {
//       this.setState({ ...values });
//     }
//   };

//   handleImageClick = values => {
//     this.setState({
//       modal: { largeImageURL: values.largeImageURL, tags: values.tag },
//     });
//   };

//   handleCloseModal = () => {
//     this.setState({ modal: null });
//   };

//   setLoader = delta => {
//     console.log(this.state.loadingCount, delta);
//     this.setState(prevState => ({
//       loadingCount: delta === 0 ? 0 : prevState.loadingCount + delta,
//     }));
//   };

//   setError = flag => {
//     this.setState({ error: flag });
//   };

//   render() {
//     return (
//       <AppWrapper>
//         <Searchbar onSubmit={this.handleSubmit} />

//         {this.state.query && !this.state.error && (
//           <ImageGallery
//             query={this.state.query}
//             imageClick={this.handleImageClick}
//             updateLoader={this.setLoader}
//             updateError={this.setError}
//           />
//         )}
//         {this.state.modal && (
//           <Modal
//             closeModal={this.handleCloseModal}
//             setLoader={this.setLoader}
//             largeImageURL={this.state.modal.largeImageURL}
//             tags={this.state.modal.tags}
//           />
//         )}
//         {this.state.loadingCount > 0 && <Loader />}
//         {this.state.query === '' && (
//           <Message>Please, input key words for search. </Message>
//         )}
//         {this.state.error && (
//           <Message>Internet connection error. Please, try later! </Message>
//         )}
//       </AppWrapper>
//     );
//   }
// }
