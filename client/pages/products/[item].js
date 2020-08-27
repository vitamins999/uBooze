import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

const fetchDrinkInfo = async (key, item) => {
  const res = await fetch(
    `http://localhost:3001/api/products/details?item=${item}`
  );
  return res.json();
};

const ItemPage = () => {
  const router = useRouter();
  const { item, postcode } = router.query;

  const { loading, error, data, status } = useQuery(
    ['drinkInfo', item],
    fetchDrinkInfo
  );

  return (
    <Layout>
      {status === 'loading' && <div>Loading data...</div>}
      {status === 'error' && <div>Error fetching data</div>}
      {status === 'success' && (
        <div>
          <h1>Does this work?</h1>
          <h2>ProductID -- {item}</h2>
          <h2>Postcode -- {postcode}</h2>

          <h3>Item Name -- {data.productName}</h3>
        </div>
      )}
    </Layout>
  );
};

export default ItemPage;
