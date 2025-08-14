import '@testing-library/react'
import {render, screen} from '@testing-library/react'
import SettingTabs from "@/reuseable/tabs/settingTabs";


describe('setting tabs', () =>{

    test('setting tabs',  () => {
        const data = [
            {name: 'Profession', id: 'Profession',},
            {name: 'Strategy', id: 'Strategy'},
        ]
        render(
            <SettingTabs id={'settingTab1'} setTabCurrentTabIndex={(num:number) => {console.log(num)}}  tabCurrentTabIndex={0} tabElement={data} />
        )
        expect(screen.getByTestId('settingTab1'))
    })

    test('setting tabs display passed data', async () => {
        const data = [
            {name: 'Profession', id: 'Profession',},
            {name: 'Strategy', id: 'Strategy'},
        ]
        render(
            <SettingTabs setTabCurrentTabIndex={(num:number) => {console.log(num)}}  tabCurrentTabIndex={0} id={'settingTab1'} tabElement={data}  />
        )
        expect(screen.getByText('Profession'))
        expect(screen.getByText('Strategy'))
    })
    test('setting tabs display passed data', async () => {
        const data = [
            {name: 'Profession', id: 'Profession',},
            {name: 'Strategy', id: 'Strategy'},
        ]
        render(
            <SettingTabs tabCurrentTabIndex={0} setTabCurrentTabIndex={(num:number) => {console.log(num)}}  id={'settingTab1'} tabElement={data}  />
        )
        expect(screen.getByText('Profession'))
        expect(screen.getByText('Strategy'))
    })

    test('setting tabs display passed data', async () => {
        const data = [
            {name: 'Profession', id: 'Profession',},
            {name: 'Strategy', id: 'Strategy'},
            {name: 'Go girls', id: 'goGirls'},
        ]

        render(
            <SettingTabs setTabCurrentTabIndex={(num:number) => {console.log(num)}} tabCurrentTabIndex={0} id={'settingTab1'} tabElement={data}  />
        )
        expect(screen.getByText('Profession'))

        expect(screen.getByText('Strategy'))

    })
})