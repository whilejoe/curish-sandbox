import React from 'react';
import GoogleAnalytics from 'react-ga';
import { withRouter } from 'react-router-dom';
import debounce from 'lodash/debounce';
import qs from 'qs';

class Analytics extends React.Component {
  constructor(props) {
    super(props);
    GoogleAnalytics.initialize('UA-112774538-1', { debug: true, gaOptions: props.options });
    this.trackPage(`${props.location.pathname}${props.location.search}`);
  }

  trackPage(page) {
    GoogleAnalytics.set({ page, ...this.props.options });
    GoogleAnalytics.pageview(page);
  }

  updateWithSearch() {
    const { pathname, search } = this.props.location;
    // TODO: Revisit to decide if we want to send search params to GA or let Algolia handle
    const query = qs.parse(search, { ignoreQueryPrefix: true });
    if (query.q !== undefined && query.q.length) {
      this.trackPage(`${pathname}${search}`);
    }
  }

  // Assume if user has stopped typing for 5 seconds we should register the url
  debouncedUpdateWithSearch = debounce(this.updateWithSearch, 5000);

  componentWillReceiveProps(nextProps) {
    const { location } = this.props;
    const nextLocation = nextProps.location;

    // Route Change
    if (location !== nextLocation) {
      // Debounce update when search params changes
      if (location.search !== nextLocation.search) this.debouncedUpdateWithSearch();
      else this.trackPage(`${nextLocation.pathname}`);
    }
  }

  render() {
    return null;
  }
}

const RouteAnalytics = withRouter(Analytics);

export default RouteAnalytics;
