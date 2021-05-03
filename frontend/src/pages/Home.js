import React from "react";
import Layout from "../components/Layout";
import { Link } from "@reach/router";

import Logo from "../components/Logo";

export default function Home() {
  return (
    <Layout isWide className="home">
      <div className="jumbotron">
        <h1>TerraPay</h1>
        <p>Shop and make payments using Terra stablecoins.</p>
        <p>An innovated, decentralized, and secure payment system.</p>
        <Link to="/buyerChoices" className="button button--secondary">
          Browse →
        </Link>
        <Link to="/merchantListing" className="button button--secondary">
          List →
        </Link>
      </div>
    </Layout>
  );
}
