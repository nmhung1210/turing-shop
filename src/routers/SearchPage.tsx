import qs from 'qs';
import * as React from 'react';
import { Card, CardDeck, Col, Container, Row } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { DispatchProp } from 'react-redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import CompColorPicker from '../components/CompColorPicker';
import CompPaginationBar from '../components/CompPaginationBar';
import CompProductCard from '../components/CompProductCard';
import CompSizePicker from '../components/CompSizePicker';
import { actionGetProducts, actionSeachProducts } from '../models/actions';
import { IRootState } from '../models/reducers';
import { IProductState } from '../models/reducers/Products';
import { IProduct } from '../models/schemas';
import { arrayChunks } from '../utils';

interface ISearchPageProps extends DispatchProp, RouteComponentProps {
  products: IProductState;
}
class SearchPage extends React.Component<ISearchPageProps> {
  public componentWillMount () {
    const { search = '' } = this.props.location;
    if (search) {
      const query = qs.parse(search.substr(1));
      if (query.query_string) {
        return this.props.dispatch(actionSeachProducts(query.query_string));
      }
    }
    this.props.dispatch(actionGetProducts());
  }

  public componentWillReceiveProps (props: ISearchPageProps) {
    if (this.props.location === props.location) {
      return;
    }
    const { search = '' } = props.location;
    if (search) {
      const query = qs.parse(search.substr(1));
      if (query.query_string) {
        return props.dispatch(actionSeachProducts(query.query_string));
      }
    }
    this.props.dispatch(actionGetProducts());
  }

  public render () {
    const products = this.props.products;
    const rows = arrayChunks(products.products.rows, 3);
    return (
      <Container>
        <Row>
          <Col md={3}>
            <Container>
              <Card className='bg-light mt-4 p-4 rounded-0'>
                <Card.Title as='h6'>Filters {products.products.count} items</Card.Title>
              </Card>
              <Card className='p-4 rounded-0  d-block'>
                <Card.Title as='h6' className='text-muted'>
                  Color
                </Card.Title>
                <CompColorPicker colors={['red', 'green', 'blue']} />
                <Card.Title as='h6' className='text-muted'>
                  Size
                </Card.Title>
                <CompSizePicker sizes={['XS', 'S', 'M', 'L', 'XL']} />

                <Button variant='danger' size='sm' className='d-block rounded-pill'>
                  Apply
                </Button>
              </Card>
            </Container>
          </Col>
          <Col md={9}>
            <Container>
              <Row>
                <Col md={12}>
                  {rows.map((items) => (
                    <CardDeck className='p-4'>
                      {items.map((product: IProduct) => (
                        <CompProductCard product={product} />
                      ))}
                    </CardDeck>
                  ))}
                  {!rows.length ? (
                    <h3 className='text-muted p-4 text-center'>
                      No product founds for <strong>{products.queryString}</strong>!
                    </h3>
                  ) : null}
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  {rows.length ? (
                    <Container className='d-flex justify-content-end p-4'>
                      <CompPaginationBar
                        limit={products.limit}
                        count={products.products.count}
                        page={products.page}
                        showCount={5}
                        onPage={(page) => this.props.dispatch(actionGetProducts(page))}
                      />
                    </Container>
                  ) : (
                    ''
                  )}
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default connect((state: IRootState) => {
  return {
    products: state.Products
  };
})(SearchPage);
