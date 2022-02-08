// drag section
import { ContractComponents } from "../ContractComponents"
import Component from "../component/Component"
import Grid from '@mui/material/Grid';

const ContractElementSection = () => {
    return <Grid container spacing={2}>
        {ContractComponents.map((component) => (
            <Component key={component.id} status={component.status} icon={component.icon} name={component.name} desc={component.desc} type={component.type} enf={component.enf} />
        ))}
    </Grid>
};

export default ContractElementSection;
