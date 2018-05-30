import ShoppingCartStepByStep from './ShoppingCartStepByStep';  
import ShoppingCart from './ShoppingCart';

const demoStepByStep = process.env.REACT_APP_DEMO_STEPS;
const SelectedShoppingCart = demoStepByStep === "yes" ? ShoppingCartStepByStep : ShoppingCart; 
export default SelectedShoppingCart;