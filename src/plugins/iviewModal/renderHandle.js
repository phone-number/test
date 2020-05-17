import { Button } from "view-design";

export default {
  functional: true,
  render(h, ctx) {
    return ctx.props.render(h)
  }
}
