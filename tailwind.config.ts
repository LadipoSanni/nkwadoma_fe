import type { Config } from "tailwindcss";

import tailwindcss_animate from "tailwindcss-animate";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",

  ],
  theme: {
  	extend: {
  		colors: {
  			blue50: '#E8EAEE',
  			blue100: '#B6BCCA',
  			blue200: '#939CB0',
  			blue300: '#626F8C',
  			blue400: '#435376',
  			meedlBlue: '#142854',
  			blue600: '#12244C',
			labelBlue: '#101828',
  			blue700: '#0E1C3C',
            meedlWhite: '#FFFFFF',
            blue800: '#0B162E',
  			blue900: '#081123',
            forgetPasswordBlue: `#475467`,
            yellow50: '#FFFEF4',
  			yellow100: '#FEFDDD',
  			yellow200: '#FEFCCD',
  			yellow300: '#FDFBB6',
  			yellow400: '#FDFAA8',
  			meedlYellow: '#FCF992',
  			yellow600: '#E5E385',
  			yellow700: '#B3B168',
  			yellow800: '#8B8950',
  			yellow900: '#6A693D',
  			lightBlue50: '#FBFDFF',
  			lightBlue100: '#F3F8FF',
  			lightBlue200: '#EEF5FF',
  			lightBlue300: '#E6F1FF',
  			authBg: '#E1EEFF',
  			lightBlue500: '#D9EAFF',
  			lightBlue600: '#C5D5E8',
  			lightBlue700: '#9AA6B5',
  			lightBlue800: '#77818C',
  			lightBlue900: '#5B626B',
  			green50: '#E6F2EA',
  			green100: '#B2D5BE',
  			green200: '#8CC19E',
  			green300: '#58A572',
  			green400: '#389457',
  			green500: '#06792D',
  			green600: '#056E29',
  			green700: '#045620',
  			green800: '#034319',
  			green900: '#033313',
  			success50: '#E6F4EB',
  			success100: '#B3DDC1',
  			success200: '#8ECCA3',
  			success300: '#5AB579',
  			success400: '#3AA75F',
  			success500: '#099137',
  			success600: '#088432',
  			success700: '#066727',
  			success800: '#05501E',
  			success900: '#043D17',
  			middelWhite: '#FFFFFF',
  			warning50: '#FCF4E7',
  			warning100: '#F4DDB4',
  			warning200: '#EFCC90',
  			warning300: '#E8B55D',
  			warning400: '#E4A63D',
  			warning500: '#DD900D',
  			warning600: '#C9830C',
  			warning700: '#9D6609',
  			warning800: '#7A4F07',
  			warning900: '#5D3C05',
  			error50: '#FAE8E8',
  			error100: '#EEB8B6',
  			error200: '#E69693',
  			error300: '#DA6662',
  			error400: '#D34843',
  			error500: '#C81A14',
  			error600: '#B61812',
  			error700: '#8E120E',
  			error800: '#6E0E0B',
  			error900: '#540B08',
  			neutral50: '#FCFCFC',
  			neutral100: '#F7F7F7',
  			neutral200: '#F3F3F3',
  			neutral300: '#EEEEEE',
  			neutral400: '#EAEAEA',
  			neutral500: '#E5E5E5',
  			neutral600: '#D0D0D0',
            neutral650: '#D0D5DD',
            neutral700: '#A3A3A3',
  			neutral800: '#7E7E7E',
  			neutral900: '#606060',
            neutral950: '#667085',
			navBorder: '#E0E3E8',
			black300: '#6A6B6A',
			black400: '#4D4E4D',
			black500: '#212221',
            gray: `#F0F2F4`,
			gray1: `#475467`,
  			grey50: '#E9E9E9',
  			grey100: '#BABABB',
  			grey200: '#98989B',
  			grey300: '#6A696D',
  			grey400: '#4D4C51',
            grey450: '#475467',
            grey500: '#201F25',
  			grey600: '#1D1C22',
  			grey700: '#17161A',
  			grey800: '#121114',
  			grey900: '#0D0D10',
			meedlBlack: '#000000',
			navbarIconColor: '#667085',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		boxShadow: {
  			custom: '0px 0px 0px 1px rgba(18, 55, 105, 0.08)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [tailwindcss_animate],
};
export default config;
