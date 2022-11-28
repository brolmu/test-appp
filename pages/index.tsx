import type { GetStaticProps, NextPage } from 'next'
import { useMemo, useState } from 'react';

import api from '../api'
import ColorFilter from '../components/ColorFilter';
import PriceRangeFilter from '../components/PriceRangeFilter';
import ProductCard from '../components/ProductCard';
import RatingFilter from '../components/RatingFilter';
import type { Filters, Filter, Product } from '../types';

type Props = {
  products: Product[];
}


export const getStaticProps: GetStaticProps = async () => {

  const products = await api.product.list();

  return {
    props: {
      products
    }
  }
}

const Home: NextPage<Props> = ({ products }) => {

  const [filters, setFilters] = useState<Filters>({
    price: null,
    color: null,
    rating: null
  })

  const matches = useMemo(() => {
    const filtersToApply = Object.values(filters).filter(Boolean);

    let matches = products;

    filtersToApply.forEach(filter => {
      matches = matches.filter(filter!);
    })

    return matches;
  }, [products, filters])

  return <main style={{
    display: "flex",
    gap: 12,
  }}>
    <aside style={{
      height: "100vh"
    }}>
      <PriceRangeFilter onChange={(filter: Filter) => setFilters(filters => ({ ...filters, price: filter }))} />
      <RatingFilter onChange={(filter: Filter) => setFilters(filters => ({ ...filters, rating: filter }))} />
      <ColorFilter onChange={(filter: Filter) => setFilters(filters => ({ ...filters, color: filter }))} products={products} />
    </aside>
    <div style={{
      display: "flex",
      flexDirection: 'column',
      gap: 12,
      flex: 1,
    }}>
      {
        matches.length > 0 && <>
          <h2>Resultados: {matches.length}</h2>
          <section style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(300px, 1fr))",
            gap: "12px"
          }}>
            {matches.map(product => <article key={product.id}>
              <ProductCard product={product} />
            </article>)}
          </section>
        </>
      }
      {
        matches.length <= 0 && <>
          <h2>No Hay Resultados Para Mostrar</h2>
        </>
      }

    </div>

  </main>
}

export default Home;