import FoodListing from "../components/FoodListing";

function PublicListing(props) {

    const testdata = [{
        "item": "ridiculus mus",
        "name": "Ursulina Mattersey",
        "createdAt": "10/19/2023",
        "address": "0676 Talisman Plaza"
    }, {
        "item": "amet turpis elementum",
        "name": "Guy Wyley",
        "createdAt": "1/14/2024",
        "address": "6 Summerview Crossing"
    }, {
        "item": "ut",
        "name": "Kassandra Lidierth",
        "createdAt": "8/8/2024",
        "address": "49620 Oriole Circle"
    }, {
        "item": "felis sed interdum",
        "name": "Arvin Weavers",
        "createdAt": "5/16/2024",
        "address": "21867 Raven Terrace"
    }, {
        "item": "posuere metus",
        "name": "Vale Shellibeer",
        "createdAt": "2/16/2024",
        "address": "38 Dwight Street"
    }]

    return (
        <div className="public-listing center-align">
            <div className="items">
                <h3 style={{textAlign: "center"}} className="mt-3">Food Listing</h3>
                <FoodListing items={testdata}/>
            </div>
        </div>
    )

}

export default PublicListing;