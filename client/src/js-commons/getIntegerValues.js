// return the type integer value based on string
export const findType = (type, typeOptions) => {
    let index = typeOptions.findIndex(x => x.atype === type);
    return typeOptions[index]?.id;
};

// return the availability integer value based on string
export const findAvailability = (availability, availabilityOptions) => {
    let index = availabilityOptions.findIndex(x => x.availability === availability);
    return availabilityOptions[index]?.id;
}

// return the breed integer value based on string
export const findBreed = (breed, breedOptions) => {
    let index = breedOptions.findIndex(x => x.breed === breed);
    return breedOptions[index]?.id;
}

// return the disposition integer value based on string
export const findDisposition = (disposition, dispositionOptions) => {
    let index = dispositionOptions.findIndex(x => x.disposition === disposition);
    return dispositionOptions[index]?.id;
}