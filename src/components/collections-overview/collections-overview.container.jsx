import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from "reselect";
import { selectIsCollectionFetching } from "../../redux/shop/shop.selectors";
import WithSpinner from "../with-spinner/with-spinner.component";
import CollectionsOverview from "./collections-overview.component";

const mapStateToProps = createStructuredSelector({
        isLoading: selectIsCollectionFetching
    }
);

// We could do the below but it's quite nested and hard to read so we'll use 'compose' from redux
// const collectionsOverviewContainer = connect(mapStateToProps)(WithSpinner(CollectionsOverview));
const CollectionsOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;
