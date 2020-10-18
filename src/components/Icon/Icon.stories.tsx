import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import Icon,{ IconProps } from './Icon'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

export default {
    title: 'mctl-ui/图标',
    component: Icon,
} as Meta;

const icons = ["ad","address-book","address-book","address-card","address-card","adjust","air-freshener","align-center","align-justify","align-left","align-right","allergies","ambulance","anchor","angle-double-down","angle-double-left","angle-double-right","angle-double-up","angle-down","angle-left","angle-right","angle-up","angry","angry","ankh","archive","archway","arrow-alt-circle-down","arrow-alt-circle-down","arrow-alt-circle-left","arrow-alt-circle-left","arrow-alt-circle-right","arrow-alt-circle-right","arrow-alt-circle-up","arrow-alt-circle-up","arrow-circle-down","arrow-circle-left","arrow-circle-right","arrow-circle-up","arrow-down","arrow-left","arrow-right","arrow-up","arrows-alt","arrows-alt-h","arrows-alt-v","assistive-listening-systems","asterisk","at","atlas","atom","audio-description","award","baby","baby-carriage","backspace","backward","bacon","bacteria","bacterium","bahai","balance-scale","balance-scale-left","balance-scale-right","ban","band-aid","barcode","bars","baseball-ball","basketball-ball","bath","battery-empty","battery-full","battery-half","battery-quarter","battery-three-quarters","bed","beer","bell","bell","bell-slash","bell-slash","bezier-curve","bible","bicycle","biking","binoculars","biohazard","birthday-cake","blender","blender-phone","blind","blog","bold","bolt","bomb","bone","bong","book","book-dead","book-medical","book-open","book-reader","bookmark","bookmark","border-all","border-none","border-style","bowling-ball","box","box-open","box-tissue","boxes","braille","brain","bread-slice","briefcase","briefcase-medical","broadcast-tower","broom","brush","bug","building","building","bullhorn","bullseye","burn","bus","bus-alt","business-time","calculator","calendar","calendar","calendar-alt","calendar-alt","calendar-check","calendar-check","calendar-day","calendar-minus","calendar-minus","calendar-plus","calendar-plus","calendar-times","calendar-times","calendar-week","camera","camera-retro","campground","candy-cane","cannabis","capsules","car","car-alt","car-battery","car-crash","car-side","caravan","caret-down","caret-left","caret-right","caret-square-down","caret-square-down","caret-square-left","caret-square-left","caret-square-right","caret-square-right","caret-square-up","caret-square-up","caret-up","carrot","cart-arrow-down","cart-plus","cash-register","cat","certificate","chair","chalkboard","chalkboard-teacher","charging-station","chart-area","chart-bar","chart-bar","chart-line","chart-pie","check","check-circle","check-circle"]

const Template: Story<IconProps> = (args) => <>
    <Icon {...args} />
    <hr />
    <div className='stories-boxStyle'>
    {
        icons.map((icon,index) => {
            return (
                <div key={index} className='stories-iconStyle'>
                    <Icon icon={icon as IconProp} size='2x'/>
                    <div className='stories-textStyle'>{ icon }</div>
                </div>)
        })
    }
    </div>
    
</>;

export const Icons_图标 = Template.bind({});

Icons_图标.args = {
    theme: 'danger',
    icon: 'coffee',
    size: '2x'
};

