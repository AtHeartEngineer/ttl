pragma circom 2.0.0;


template CalculateTTL() {
    signal input received_ttl;
    signal output new_ttl;

    new_ttl <== received_ttl + 1;
}