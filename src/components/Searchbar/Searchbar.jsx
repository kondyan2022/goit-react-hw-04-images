import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  SearchBarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');
  const handleChange = evt => {
    setQuery(evt.target.value);
  };
  const handleSubmit = evt => {
    evt.preventDefault();
    onSubmit({ query: query });
  };
  return (
    <SearchBarHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
      </SearchForm>
    </SearchBarHeader>
  );
};

// class Searchbar extends Component {
//   state = { query: '' };
//   handleChange = evt => {
//     this.setState({ [evt.target.name]: evt.target.value });
//   };
//   handleSubmit = evt => {
//     evt.preventDefault();
//     this.props.onSubmit({ ...this.state });
//   };
//   render() {
//     return (
//       <SearchBarHeader>
//         <SearchForm onSubmit={this.handleSubmit}>
//           <SearchFormButton type="submit">
//             <SearchFormButtonLabel>Search</SearchFormButtonLabel>
//           </SearchFormButton>

//           <SearchFormInput
//             type="text"
//             name="query"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             value={this.state.query}
//             onChange={this.handleChange}
//           />
//         </SearchForm>
//       </SearchBarHeader>
//     );
//   }
// }

export default Searchbar;

Searchbar.propTypes = { onSubmit: PropTypes.func };
