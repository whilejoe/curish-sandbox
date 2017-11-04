import React, { Component } from 'react';
import styled from 'styled-components';
import { withApollo } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import { Flex, FlexContent } from 'components/Flex';
import StatelessInput from 'components/StatelessInput';
import Icon from 'components/Icon';
import { PALETTE, THEME, PRIMARY_KEY } from 'constants/theme';

const OmniIcon = styled(Icon)`
  width: 1.2em;
  height: 1.2em;
  color: inherit;
  vertical-align: middle;
`;

const OmniButton = styled.button`
  height: 2rem;
  background-color: white;
  color: ${props => (props.expand ? THEME[PRIMARY_KEY] : PALETTE.GRAY.DARK)};
  transition: color 200ms ease-out;

  &:hover {
    color: ${THEME[PRIMARY_KEY]};
  }
`;

const OmniInput = styled(StatelessInput)`
  position: absolute;
  left: 0;
  bottom: 0;
  height: 3rem;
  padding: 1.4rem;
  margin-bottom: 0;
  background-color: #f5f5f5;
  font-size: 0.85em;
  z-index: ${props => (props.expand ? '1' : '-1')};
  transform: ${props => (props.expand ? 'translateY(100%)' : 'translateY(0)')};
  transition: transform 180ms ease-out;
`;

class OmniSearch extends Component {
  state = {
    searchText: '',
    expand: false
  };

  handleOnSubmit = e => {
    e.preventDefault();
    const query = { q: this.state.searchText };
    const str = qs.stringify(query);
    this.setState({ searchText: '' });
    this.props.history.push({
      pathname: '/search',
      search: str
    });
    // this.executeSearch(str);
    console.log('str', str);
  };

  handleKeyDown = e => {
    if (e && (e.keyCode === 9 || e.keyCode === 13)) {
      const query = { q: this.state.searchText };
      const str = qs.stringify(query);
      this.setState({ searchText: '', expand: false });
      this.props.history.push({
        pathname: '/search',
        search: str
      });
      // this.executeSearch(str);
      console.log('str', str);
    }
  };

  handleClick = e => {
    this.setState(prevState => {
      return { expand: !prevState.expand };
    }, () => this.state.expand && setTimeout(() => this.inputRef.focus(), 180));
    console.log('this.inputRef', this.inputRef);
  };

  setRef = node => {
    this.inputRef = node;
  };

  render() {
    return (
      <Flex align="center">
        <FlexContent space="self">
          <OmniButton expand={this.state.expand} onClick={this.handleClick}>
            <OmniIcon type="search" />
          </OmniButton>
        </FlexContent>
        <FlexContent>
          <OmniInput
            autoFocus={this.state.expand}
            type="input"
            placeholder="Search Curish"
            value={this.state.searchText}
            onChange={e => this.setState({ searchText: e.target.value })}
            expand={this.state.expand}
            innerRef={node => this.setRef(node)}
            onKeyDown={this.handleKeyDown}
          />
        </FlexContent>
      </Flex>
    );
  }

  executeSearch = async queryString => {
    const query = qs.parse(queryString, { ignoreQueryPrefix: true });
    if (query.q) {
      console.log('query.q', query.q);
      // query here
      this.setState({ searchText: query.q });
    }
  };
}

const OmniWithRouter = withRouter(OmniSearch);
export default withApollo(OmniWithRouter);
