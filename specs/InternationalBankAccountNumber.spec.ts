import { describe, expect, it, test } from 'vitest';
import { InternationalBankAccountNumber } from '../src';

describe('IBAN', () => {

    it('has an accessble length', () => {
        const svo = InternationalBankAccountNumber.parse('US70 ABCD 1234');
        expect(svo!.length).toBe(12);
    });

    test.each([
        '',
        null,
        undefined,
    ])('parses %s as null', (s) => {
        const svo = InternationalBankAccountNumber.parse(s!);
        expect(svo).toBeNull();
    });

    test.each([
        'AD1200012030200359100100',
        'AE950210000000693123456',
        'AL47212110090000000235698741',
        'AT611904300234573201',
        'AZ21NABZ00000000137010001944',
        'BA391290079401028494',
        'BE68539007547034',
        'BG80BNBG96611020345678',
        'BH29BMAG1299123456BH00',
        'BI1320001100010000123456789',
        'BR9700360305000010009795493P1',
        'BY13NBRB3600900000002Z00AB00',
        'CH3608387000001080173',
        'CR05015202001026284066',
        'CY17002001280000001200527600',
        'CZ6508000000192000145399',
        'DE68210501700012345678',
        'DJ2110002010010409943020008',
        'DK5000400440116243',
        'DO22ACAU00000000000123456789',
        'EE382200221020145685',
        'EG380019000500000000263180002',
        'ES9121000418450200051332',
        'FI2112345600000785',
        'FO2000400440116243',
        'FR1420041010050500013M02606',
        'GB46BARC20789863274845',
        'GE29NB0000000101904917',
        'GI75NWBK000000007099453',
        'GL2000400440116243',
        'GR1601101250000000012300695',
        'GT82TRAJ01020000001210029690',
        'HR1210010051863000160',
        'HU42117730161111101800000000',
        'IE29AIBK93115212345678',
        'IL620108000000099999999',
        'IQ98NBIQ850123456789012',
        'IS140159260076545510730339',
        'IT60X0542811101000000123456',
        'JO94CBJO0010000000000131000302',
        'KW81CBKU0000000000001234560101',
        'KZ75125KZT2069100100',
        'LB30099900000001001925579115',
        'LC55HEMM000100010012001200023015',
        'LI21088100002324013AA',
        'LT121000011101001000',
        'LU280019400644750000',
        'LV80BANK0000435195001',
        'LY83002048000020100120361',
        'MC1112739000700011111000H79',
        'MD24AG000225100013104168',
        'ME25505000012345678951',
        'MK07250120000058984',
        'MR1300020001010000123456753',
        'MT84MALT011000012345MTLCAST001S',
        'MU17BOMM0101101030300200000MUR',
        'NI91BAMC01120203000003558124',
        'NL20INGB0001234567',
        'NO9386011117947',
        'PK36SCBL0000001123456702',
        'PL61109010140000071219812874',
        'PS92PALS000000000400123456702',
        'PT50000201231234567890154',
        'QA58DOHB00001234567890ABCDEFG',
        'RO49AAAA1B31007593840000',
        'RS35260005601001611379',
        'RU0204452560040702810412345678901',
        'SA8440000108054011730013',
        'SC18SSCB11010000000000001497USD',
        'SD2129010501234001',
        'SE3550000000054910000003',
        'SI56191000000123438',
        'SK3112000000198742637541',
        'SM86U0322509800000000270100',
        'ST23000100010051845310146',
        'SV62CENR00000000000000700025',
        'TL380010012345678910106',
        'TN5910006035183598478831',
        'TR330006100519786457841326',
        'UA213996220000026007233566001',
        'VA59001123000012345678',
        'VG96VPVG0000012345678901',
        'XK051212012345678906',
        'AO06004400006729503010102',
        'BF42BF0840101300463574000390',
        'BJ66BJ0610100100144390000769',
        'CF4220001000010120069700160',
        'CG3930011000101013451300019',
        'CI15QO4875019424693110901733',
        'CM2110002000300277976315008',
        'CV64000500000020108215144',
        'DZ580002100001113000000570',
        'GA2140021010032001890020126',
        'GQ7050002001003715228190196',
        'GW04GW1430010181800637601',
        'HN54PISA00000000000000123124',
        'IR580540105180021273113007',
        'KM4600005000010010904400137',
        'MA64011519000001205000534921',
        'MG4600005030071289421016045',
        'ML13ML0160120102600100668497',
        'MZ97123412341234123412341',
        'NE58NE0380100100130305000268',
        'SN05TI8008354151588139598706',
        'TD8960002000010271091600153',
        'TG53TG0090604310346500400070'])('parses %s', (s) => {
            const iban = InternationalBankAccountNumber.parse(s);
            expect(iban!.toString()).toBe(s);
        });


    test.each([
        "US70 ABCD 1234",
        "US41 1234 5678 90AB CDEF GHIJ KLMN OPQR",
        "US19 T3NB 32YP 2588 8395 8870 7523 1343 8517"])('%s for countries without IBAN', (s) => {
            const iban = InternationalBankAccountNumber.parse(s);
            expect(iban!.format('F')).toBe(s);
        });

    test.each([
        "(IBAN)",
        "(iban)",
        "(iban) ",
        "iban:",
        "IBAN: "])('we prefxi %s can be parsed', (s) => {
            const iban = InternationalBankAccountNumber.parse(s + 'NL20INGB0001234567');
            expect(iban!.toString()).toBe('NL20INGB0001234567');
        });


    it('Does not parse IBAN with invalid checksum', () => {
        const iban = InternationalBankAccountNumber.tryParse('NL21INGB0001234567');
        expect(iban).toBeUndefined();
    });

    it('contains the country linked', () => {
        const iban = InternationalBankAccountNumber.tryParse('NL20INGB0001234567');
        expect(iban?.country).toBe('NL');
    })

    it('formats to human readable with F', () => {
        const iban1 = InternationalBankAccountNumber.parse('CH3608387000001080173');
        const iban2 = InternationalBankAccountNumber.parse('NL20INGB0001234567');
        const iban3 = InternationalBankAccountNumber.parse('CG3930011000101013451300019');
        const iban4 = InternationalBankAccountNumber.parse('CI15QO4875019424693110901733');

        expect(iban1!.format('F')).toBe('CH36 0838 7000 0010 8017 3');
        expect(iban2!.format('F')).toBe('NL20 INGB 0001 2345 67');
        expect(iban3!.format('F')).toBe('CG39 3001 1000 1010 1345 1300 019');
        expect(iban4!.format('F')).toBe('CI15 QO48 7501 9424 6931 1090 1733');
    });

    it('formats to human readable with f', () => {
        const iban = InternationalBankAccountNumber.parse('NL20INGB0001234567');
        expect(iban!.format('f')).toBe('nl20 ingb 0001 2345 67');
    });

    it('formats to human readable with H using nbsp', () => {
        const iban = InternationalBankAccountNumber.parse('NL20INGB0001234567');
        expect(iban!.format('H')).toBe('NL20 INGB 0001 2345 67');
    });

    it('formats to human readable with h using nbsp', () => {
        const iban = InternationalBankAccountNumber.parse('NL20INGB0001234567');
        expect(iban!.format('h')).toBe('nl20 ingb 0001 2345 67');
    });

    it('formats to human readable with using nbsp, by default', () => {
        const iban = InternationalBankAccountNumber.parse('NL20INGB0001234567');
        expect(iban!.format()).toBe('NL20 INGB 0001 2345 67');
    });

    test.each(['M', 'U'])('format(%s) returns machine-readable/unformatted', (f) => {
        const iban = InternationalBankAccountNumber.parse('NL20INGB0001234567');
        expect(iban!.format(f)).toBe('NL20INGB0001234567');
    });

    test.each(['m', 'u'])('format(%s) returns machine-readable/unformatted lowercased', (f) => {
        const iban = InternationalBankAccountNumber.parse('NL20INGB0001234567');
        expect(iban!.format(f)).toBe('nl20ingb0001234567');
    });

    it('should return undefined when input is more than 10 characters', () => {
        const postalCode = InternationalBankAccountNumber.tryParse('INVALID');
        expect(postalCode).toBeUndefined();
    });

    it('throws for invalid input on parse', () => {

        expect(() => InternationalBankAccountNumber.parse('INVALID')).toThrowError(expect.objectContaining({
            message: 'Not a valid IBAN',
            attemptedValue: 'INVALID',
        }));
    });

    it('should correctly compare two postal codes for equality', () => {
        const iban1 = InternationalBankAccountNumber.parse('NL20INGB0001234567');
        const iban2 = InternationalBankAccountNumber.parse('NL20INGB0001234567');
        const iban3 = InternationalBankAccountNumber.parse('CH3608387000001080173');
        expect(iban1!.equals(iban2)).toBe(true);
        expect(iban1!.equals(iban3)).toBe(false);
    });
});
