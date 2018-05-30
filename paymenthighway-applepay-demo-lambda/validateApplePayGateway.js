import URL from 'url';

const urls = [
    'apple-pay-gateway-apple.com',
    'apple-pay-gateway-nc-pod1.apple.com',
    'apple-pay-gateway-nc-pod2.apple.com',
    'apple-pay-gateway-nc-pod3.apple.com',
    'apple-pay-gateway-nc-pod4.apple.com',
    'apple-pay-gateway-nc-pod5.apple.com',
    'apple-pay-gateway-pr-pod1.apple.com',
    'apple-pay-gateway-pr-pod2.apple.com',
    'apple-pay-gateway-pr-pod3.apple.com',
    'apple-pay-gateway-pr-pod4.apple.com',
    'apple-pay-gateway-pr-pod5.apple.com',
    'apple-pay-gateway-nc-pod1-dr.apple.com',
    'apple-pay-gateway-nc-pod2-dr.apple.com',
    'apple-pay-gateway-nc-pod3-dr.apple.com',
    'apple-pay-gateway-nc-pod4-dr.apple.com',
    'apple-pay-gateway-nc-pod5-dr.apple.com',
    'apple-pay-gateway-pr-pod1-dr.apple.com',
    'apple-pay-gateway-pr-pod2-dr.apple.com',
    'apple-pay-gateway-pr-pod3-dr.apple.com',
    'apple-pay-gateway-pr-pod4-dr.apple.com',
    'apple-pay-gateway-pr-pod5-dr.apple.com',
    'cn-apple-pay-gateway-sh-pod1.apple.com',
    'cn-apple-pay-gateway-sh-pod1-dr.apple.com',
    'cn-apple-pay-gateway-sh-pod2.apple.com',
    'cn-apple-pay-gateway-sh-pod2-dr.apple.com',
    'cn-apple-pay-gateway-sh-pod3.apple.com',
    'cn-apple-pay-gateway-sh-pod3-dr.apple.com',
    'cn-apple-pay-gateway-tj-pod1.apple.com',
    'cn-apple-pay-gateway-tj-pod1-dr.apple.com',
    'cn-apple-pay-gateway-tj-pod2.apple.com',
    'cn-apple-pay-gateway-tj-pod2-dr.apple.com',
    'cn-apple-pay-gateway-tj-pod3.apple.com',
    'cn-apple-pay-gateway-tj-pod3-dr.apple.com'
  ];
  
export const isValidApplePayGateway = (url) => {
    return urls.includes(URL.parse(url).host);
}
