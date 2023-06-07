const dropdown = (props: { lang: { value: string, name: string }[] }): JSX.Element => (
    <select id="lang" name="lang">
        {props.lang.map(x => (<option value={x.value} key={x.value}>{x.name}</option>))}
    </select>
)


export default dropdown