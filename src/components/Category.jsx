import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {collection, getDocs, where, query, limit, orderBy, startAfter} from 'firebase/firestore'
import {db} from '../firebase.config'
import {toast} from 'react-toastify'
import Spinner from './Spinner'

function Category() {
    const [listings, setListings] = useState(null)
    const [loading, setLoading]  = useState(true)

    const params = useParams()
    useEffect(() => {
        const fetchListing = async () => {
            try {
                //get a referance
                const listingRef = collection(db, 'listings')

                //create query
                const q = query(
                    listingRef, 
                    where('type', '==', params.categoryName), 
                    orderBy('timestamp', 'desc'),
                    limit(10)
                )

                //Execute query

                const querySnap = await getDocs(q)
                
                let listings = []

                querySnap.forEach((doc) => {
                   return listings.push({
                    id: doc.id,
                    data: doc.data()
                   })
                })
                setListings(listings)
                console.log(listings)
                setLoading(false)
                
            } catch (error) {
                toast.error('Could not fetch listingd')
            }
        }

        fetchListing()
    }, [])

    return ( 
        <div className='category'>
            <p className="pageHeader">
                {params.categoryName === 'rent' ? 'Places for rent': 'Places for sale'}
            </p>
            <header>
                {loading ? (<Spinner /> ): listings && listings.length > 0 ? (
                <>
                    <main>
                        <ul className='categoryLisitings'>
                            {listings.map((listing) => {
                                return <h3>{listing.data.name}</h3>
                            } )}
                        </ul>
                    </main>
                </>
                ):( <p>No listings for {params.categoryName}</p>)}
            </header>
           
        </div>
     );
}

export default Category;