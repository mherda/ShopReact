import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';

import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions";

// match, history, location are being passed by default by Route from App
class ShopPage extends React.Component {

    componentDidMount() {
      const { fetchCollectionsStartAsync } = this.props;
      fetchCollectionsStartAsync();
    }
    render() {
        const { match } = this.props;
        return(
            <div className='shop-page'>
                <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
                <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
            </div>
        );
    }

}

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})

export default connect(null,mapDispatchToProps)(ShopPage);


// First way utilising firebase only - here onSnapshot is subscribed to any changes and will update regardless of react
// mounts/remounts

// componentDidMount() {
//     const { updateCollections } = this.props;
//     const collectionRef = firestore.collection('collections')
//
//     collectionRef.onSnapshot(async snapshot => {
//         const collectionMap = convertCollectionsSnapshotToMap(snapshot);
//         updateCollections(collectionMap);
//         this.setState({loading: false});
//     })
// }

// Here we're using .get() which is part of the firebase methods. It returns a promise so we can utilise the familiar .then
// WARNING: new data gets updated only when the component remounts!!!!
// componentDidMount() {
//     const { updateCollections } = this.props;
//     const collectionRef = firestore.collection('collections')
//
//     collectionRef.get().then(snapshot => {
//         const collectionMap = convertCollectionsSnapshotToMap(snapshot);
//         updateCollections(collectionMap);
//         this.setState({loading: false});
//     });
// }

// Totally independent way of firebase. Firebase provides a normal API.
// The problem is that the values of the collections are deeply nested - so we'd need to write some utility to get them
// on the surface and ready to be processed/accessed.
// componentDidMount() {
//     const { updateCollections } = this.props;
//     const collectionRef = firestore.collection('collections')
//
//     fetch('https://googleapis.com/v1/projects/crwn-db-5d917/databases/(default)/documents/collections')
//         .then(response => response.json())
//         .then(collections => console.log(collections));
//     //
//     // collectionRef.get().then(snapshot => {
//     //     const collectionMap = convertCollectionsSnapshotToMap(snapshot);
//     //     updateCollections(collectionMap);
//     //     this.setState({loading: false});
//     // });
// }