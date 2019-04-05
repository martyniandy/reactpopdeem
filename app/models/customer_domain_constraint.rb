class CustomerDomainConstraint
  # Implement the .matches? method and pass in the request object
  def self.matches? request
    matching_customer?(request)
  end

  def self.matching_customer? request
    # handle the case of the user's domain being either www. or a root domain with one query
    if request.subdomain == 'www'
      req = request.host[4..-1]
    else
      req = request.host
    end

    # first test if there exists a Site with a domain which matches the request,
    # if not, check the subdomain. If none are found, the the 'match' will not match anything
    Customer.where('lower(slug) = ?', request.subdomain.downcase).any?
  end
end
