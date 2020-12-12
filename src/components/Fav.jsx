import React, { Component } from 'react'
// import ItemCard from './ItemCard'

export default class Fav extends Component {
    render(){
        return(
        <div>

            <div
                   style={{
                    display: "flex",
                    justifyContent: "space-around",
                    flexWrap: "wrap",
                    width: "59%",
                    margin: "0px auto",
                }}
                >
                <p
                    style={{
                    color: "#292a2e",
                    fontSize: "20px",
                    fontWeight: "500",
                    marginTop: "27px",
                    }}
                >
                   My Favourites
                </p>
                </div>
                <div
                style={{
                    display: "flex",
                    justifyContent: "",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    width: "70%",
                    margin: "0px auto",
                }}
                >
                {/* <ItemCard />
                <ItemCard />
                <ItemCard />
                <ItemCard />
                <ItemCard />
                <ItemCard />
                <ItemCard />
                <ItemCard /> */}
                </div>
        </div>

        )
    }
}