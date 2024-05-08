

import PropTypes from 'prop-types';

export default function ErrorAPI(props) {
  const { error } = props;
  return (
    <div>{error}</div>
  );
}

ErrorAPI.propTypes = {
  error: PropTypes.string.isRequired,
};


