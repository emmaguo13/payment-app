import React from 'react';
import Layout from '../components/Layout';
import { Link } from '@reach/router';

import Logo from '../components/Logo';

export default function Home() {
  return (
    <Layout isWide className="home">
      <div className="jumbotron">
        <Logo />
        <aside>
          <h1>A TerraPay</h1>
          <Link to="/buyerOptions" className="button button--secondary">Browse →</Link>
          <Link to="/merchantListing" className="button button--secondary">List →</Link>
        </aside>
      </div>
    </Layout>
  );
}

