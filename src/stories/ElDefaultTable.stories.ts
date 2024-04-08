import type { Meta, StoryObj } from '@storybook/vue3';
import ElDefaultTable from '@/components/defaultTable/elementUI/ElDefaultTable.vue'

const meta = {
  title: 'table/ElDefaultTable',
  component: ElDefaultTable,
  render: () => ({
    components: { ElDefaultTable },
    template: '<ElDefaultTable />'
  }),
  parameters: {
    layout: 'fullscreen'
  },
  argTypes: {
    titlePosition: {
      control: 'select',
      options: ['left', 'right', 'center'],
    },
    // pageBackground:false,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ElDefaultTable>;

export default meta
type Story = StoryObj<typeof meta>

// export const PageBackGround: Story = {
//   args: {
//     pageBackground: false,
//   }
// }