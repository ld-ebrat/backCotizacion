const { Html, Head, Preview, Tailwind, Section, Img, Container, Text } = require("@react-email/components")

const template = () => {
    <Html>
        <Head />
        <Preview>
            Esto es un preview
        </Preview>
        <Tailwind>
            <Section className="font-sans bg-[#fff]">
                <Container className="bg-[#ccdddd] m-auto py-5 px-12">
                    <Text className="text-hunt-2.2 text-2xl">
                        fixtergeek.com
                    </Text>
                    <Text className="text-ebrat-330">
                        es momento de dominar javascrip
                    </Text>
                    <Text className="text-ebrat-330 text-sm">
                        Bootcam
                    </Text>
                    <Img src="https://i.imgur.com/CCKyEm0.png" className="rounded-lg w-full" />
                    <Section className="font-sans">
                        <Container className="bg-[#fff] mt-6 py-6 px-12 rounded-lg">
                            <Text className="text-sm font-bold">
                                Aprende React de forma correcta facil
                            </Text>
                            <Text>
                                lorenadgdsgsdgsdgsdgsdgsd sdgsd gsdg sdg sdg sdgsdgsdgsdg sdgsdgsdgsd gsdgsdgsdg
                                sdgsdg sdgsdgsdgsdgsdg sdgsdgsdg qgdfhd hdfhdfhdfh
                                dfh dfhdfhdfhd fhdfhdfhdfh
                                dh dfhdfhdfhdf
                            </Text>
                        </Container>
                    </Section>
                </Container>
            </Section>
            <Section className="font-sans">
                <Container className="bg-[#ffff] my-0 mx-auto py-0 px-12 rounded-lg">
                    <Text className="bg-ebrat-330">
                        www.google.com
                    </Text>
                </Container>
            </Section>
        </Tailwind>

    </Html>
}

module.exports = template